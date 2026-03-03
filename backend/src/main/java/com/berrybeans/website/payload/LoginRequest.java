package com.berrybeans.website.payload;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
