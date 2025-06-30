// package com.example.crowdfunding.controller;

// import com.stripe.Stripe;
// import com.stripe.exception.StripeException;
// import com.stripe.model.checkout.Session;
// import com.stripe.param.checkout.SessionCreateParams;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import com.example.crowdfunding.service.CommunityService;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/stripe")
// public class StripeController {

//     @Value("${stripe.secret.key}")
//     private String stripeSecretKey;

//     private final CommunityService communityService;

//     public StripeController(CommunityService communityService) {
//         this.communityService = communityService;
//     }

//     @PostMapping("/create-checkout-session")
//     public ResponseEntity<String> createCheckoutSession(@RequestParam Long amount, @RequestParam String currency, @RequestParam Long communityId) {
//         Stripe.apiKey = stripeSecretKey;

//         SessionCreateParams params = SessionCreateParams.builder()
//                 .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
//                 .setMode(SessionCreateParams.Mode.PAYMENT)
//                 .setSuccessUrl("http://localhost:3000/success")
//                 .setCancelUrl("http://localhost:3000/cancel")
//                 .putMetadata("communityId", String.valueOf(communityId))
//                 .addLineItem(
//                         SessionCreateParams.LineItem.builder()
//                                 .setQuantity(1L)
//                                 .setPriceData(
//                                         SessionCreateParams.LineItem.PriceData.builder()
//                                                 .setCurrency(currency)
//                                                 .setUnitAmount(amount)
//                                                 .setProductData(
//                                                         SessionCreateParams.LineItem.PriceData.ProductData.builder()
//                                                                 .setName("Donation")
//                                                                 .build())
//                                                 .build())
//                                 .build())
//                 .build();

//         try {
//             Session session = Session.create(params);
//             communityService.updateCommunityContribution(communityId, (double) amount / 100);
//             return new ResponseEntity<>(session.getUrl(), HttpStatus.OK);
//         } catch (StripeException e) {
//             return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// }