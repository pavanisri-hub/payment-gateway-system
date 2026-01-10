package com.gateway.controllers;

import com.gateway.dto.PaymentResponseDTO;
import com.gateway.models.Merchant;
import com.gateway.models.Order;
import com.gateway.models.Payment;
import com.gateway.services.AuthenticationService;
import com.gateway.services.OrderService;
import com.gateway.services.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentsController {

    private final PaymentService paymentService;
    private final AuthenticationService authenticationService;
    private final OrderService orderService;

    public PaymentsController(
            PaymentService paymentService,
            AuthenticationService authenticationService,
            OrderService orderService
    ) {
        this.paymentService = paymentService;
        this.authenticationService = authenticationService;
        this.orderService = orderService;
    }

    /* =========================
       CREATE PAYMENT
       ========================= */
    @PostMapping
    public ResponseEntity<?> createPayment(
            @RequestHeader("X-Api-Key") String apiKey,
            @RequestHeader("X-Api-Secret") String apiSecret,
            @RequestBody Map<String, Object> body
    ) {

        Merchant merchant = authenticationService.authenticate(apiKey, apiSecret);

        String orderId = (String) body.get("order_id");
        String method = (String) body.get("method");

        String vpa = (String) body.get("vpa");
        String cardLast4 = (String) body.get("card_last4");
        String bank = (String) body.get("bank");
        String wallet = (String) body.get("wallet");
        String email = (String) body.get("email");
        String contact = (String) body.get("contact");

        Order order = orderService.getOrderById(orderId, merchant);

        Payment payment = paymentService.createPayment(
                merchant,
                order,
                method,
                cardLast4,
                bank,
                wallet,
                vpa,
                email,
                contact
        );

        PaymentResponseDTO dto = buildPaymentDTO(payment);

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    /* =========================
       GET PAYMENT BY ID
       ========================= */
    @GetMapping("/{paymentId}")
    public ResponseEntity<?> getPayment(
            @RequestHeader("X-Api-Key") String apiKey,
            @RequestHeader("X-Api-Secret") String apiSecret,
            @PathVariable String paymentId
    ) {

        Merchant merchant = authenticationService.authenticate(apiKey, apiSecret);

        Payment payment = paymentService.getPayment(paymentId, merchant);

        PaymentResponseDTO dto = buildPaymentDTO(payment);

        return ResponseEntity.ok(dto);
    }

    /* =========================
       DTO BUILDER
       ========================= */
    private PaymentResponseDTO buildPaymentDTO(Payment payment) {

        PaymentResponseDTO dto = new PaymentResponseDTO();
        dto.id = payment.getId();
        dto.order_id = payment.getOrder().getId();
        dto.amount = payment.getAmount();
        dto.currency = payment.getCurrency();
        dto.method = payment.getMethod();
        dto.status = payment.getStatus();
        dto.vpa = payment.getVpa();
        dto.card_last4 = payment.getCardLast4();
        dto.card_network = payment.getCardNetwork();
        dto.created_at = payment.getCreatedAt();
        dto.updated_at = payment.getUpdatedAt();

        return dto;
    }
}
