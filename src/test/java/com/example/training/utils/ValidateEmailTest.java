package com.example.training.utils;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ValidateEmailTest {

    private final ValidateEmail underTest = new ValidateEmail();

    @Test
    void itShouldValidateCorrectEmail() {
        assertThat(underTest.test("hello@gmail.com")).isTrue();
    }

    @Test
    void isIncorrectEmail() {
        assertThat(underTest.test("hellogmail.com")).isFalse();
    }

    @Test
    void isIncorrectEmailWithoutDot() {
        assertThat(underTest.test("hellogmail@com")).isFalse();

    }
}