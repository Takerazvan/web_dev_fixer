package com.webdevfix.dto;



public class RegisterRequestDTO {
    private String first_name;
    private String last_name;
    private String email;
    private String password;

    public RegisterRequestDTO(String firstName, String lastName, String email, String password) {
        first_name = firstName;
        last_name = lastName;
        this.email = email;
        this.password = password;
    }


    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}