// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title SimpleStorage - minimal contract with read & write
contract SimpleStorage {
    uint256 public amount;

    /// @notice Write a new amount
    /// @param _amount The new amount to store
    function write(uint256 _amount) external {
        amount = _amount;
    }

    /// @notice Read current amount (auto-generated getter `amount()` is available)
}
