package lt.codeacademy.rest.Exceptions;

import java.util.function.Supplier;

public class OrderNotFoundException extends RuntimeException{
    public OrderNotFoundException(String errorMessage) {
        super((errorMessage));
    }
}