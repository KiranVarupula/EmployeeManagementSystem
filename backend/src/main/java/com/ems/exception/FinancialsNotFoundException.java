package com.ems.exception;

public class FinancialsNotFoundException extends RuntimeException {
    public FinancialsNotFoundException(Long id) {
        super("Could not find financial record with id " + id);
    }
}
