// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SimpleStorage {
    uint private data;
    
    function setData(uint newData) external {
        data = newData;
    }
    
    function getData() external view returns(uint) {
        return data;
    }
}