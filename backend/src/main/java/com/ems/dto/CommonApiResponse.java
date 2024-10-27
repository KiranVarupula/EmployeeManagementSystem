package com.ems.dto;

public class CommonApiResponse {

    private String responseMessage; // Message detailing the result of the operation
    private boolean success; // Indicates if the operation was successful

    // Default constructor
    public CommonApiResponse() {
    }

    // Parameterized constructor
    public CommonApiResponse(String responseMessage, boolean success) {
        this.responseMessage = responseMessage;
        this.success = success;
    }

    // Getter for responseMessage
    public String getResponseMessage() {
        return responseMessage;
    }

    // Setter for responseMessage
    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    // Getter for success
    public boolean isSuccess() {
        return success;
    }

    // Setter for success
    public void setSuccess(boolean success) {
        this.success = success;
    }
}
