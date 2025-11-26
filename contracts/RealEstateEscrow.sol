// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RealEstateEscrow {
    address public owner;
    
    enum Status { PENDING, APPROVED, SETTLED }
    
    struct Reservation {
        address buyer;
        string propertyId;
        uint256 depositAmount;
        uint256 totalPrice;
        Status status;
        uint256 timestamp;
    }
    
    mapping(uint256 => Reservation) public reservations;
    uint256 public reservationCount;
    
    event ReservationCreated(uint256 indexed id, address buyer, string propertyId);
    event InspectionApproved(uint256 indexed id);
    
    constructor() {
        owner = msg.sender;
    }
    
    function createReservation(string memory _propertyId, uint256 _totalPrice) external payable {
        require(msg.value == (_totalPrice * 10) / 100, "Must deposit 10%");
        
        reservationCount++;
        reservations[reservationCount] = Reservation({
            buyer: msg.sender,
            propertyId: _propertyId,
            depositAmount: msg.value,
            totalPrice: _totalPrice,
            status: Status.PENDING,
            timestamp: block.timestamp
        });
        
        emit ReservationCreated(reservationCount, msg.sender, _propertyId);
    }
    
    function approveInspection(uint256 _id) external {
        require(msg.sender == owner);
        reservations[_id].status = Status.APPROVED;
        emit InspectionApproved(_id);
    }
    
    function getReservation(uint256 _id) external view returns (Reservation memory) {
        return reservations[_id];
    }
}
