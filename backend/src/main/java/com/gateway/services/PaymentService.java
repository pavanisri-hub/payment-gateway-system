package com.gateway.services;

import com.gateway.models.Merchant;
import com.gateway.models.Order;
import com.gateway.models.Payment;
import com.gateway.repositories.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Random;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ValidationService validationService;

    public PaymentService(
            PaymentRepository paymentRepository,
            ValidationService validationService
    ) {
        this.paymentRepository = paymentRepository;
        this.validationService = validationService;
    }

    /* =========================
       CREATE PAYMENT
       ========================= */
    public Payment createPayment(
            Merchant merchant,
            Order order,
            String method,
            String cardLast4,
            String bank,
            String wallet,
            String vpa,
            String email,
            String contact
    ) {

        if (!order.getMerchant().getId().equals(merchant.getId())) {
            throw new RuntimeException("NOT_FOUND_ERROR");
        }

        Payment payment = new Payment();
        payment.setId(generatePaymentId());
        payment.setMerchant(merchant);
        payment.setOrder(order);
        payment.setAmount(order.getAmount());
        payment.setCurrency(order.getCurrency());
        payment.setMethod(method);
        payment.setStatus("processing");
        payment.setCreatedAt(Instant.now());
        payment.setUpdatedAt(Instant.now());

        if ("upi".equals(method)) {
            if (!validationService.isValidVPA(vpa)) {
                throw new RuntimeException("INVALID_VPA");
            }
            payment.setVpa(vpa);
        }

        if ("card".equals(method)) {
            if (cardLast4 == null || cardLast4.length() != 4) {
                throw new RuntimeException("INVALID_CARD");
            }
            payment.setCardLast4(cardLast4);
        }

        paymentRepository.save(payment);
        simulateProcessing(payment);
        return paymentRepository.save(payment);
    }

    /* =========================
       GET PAYMENT
       ========================= */
    public Payment getPayment(String paymentId, Merchant merchant) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("NOT_FOUND_ERROR"));

        if (!payment.getMerchant().getId().equals(merchant.getId())) {
            throw new RuntimeException("NOT_FOUND_ERROR");
        }

        return payment;
    }

    /* =========================
       INTERNAL HELPERS
       ========================= */
    private void simulateProcessing(Payment payment) {
        try {
            Thread.sleep(1500);
            payment.setStatus("success");
            payment.setUpdatedAt(Instant.now());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private String generatePaymentId() {
        return "pay_" + validationService.randomAlphaNumeric(14);
    }
    public Payment getById(String paymentId) {
    return paymentRepository.findById(paymentId)
            .orElseThrow(() -> new RuntimeException("NOT_FOUND_ERROR"));
}
}