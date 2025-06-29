package com.example.crowdfunding.controller;

import com.example.crowdfunding.service.CommunityService;
import com.stripe.model.Event;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @Autowired
    private CommunityService communityService;

    @PostMapping("/api/stripe/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (Exception e) {
            return new ResponseEntity<>("Webhook Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        // Deserialize the event object and handle different event types
        StripeObject stripeObject = event.getDataObjectDeserializer().deserializeUnsafe();

        switch (event.getType()) {
            case "checkout.session.completed":
                Session session = (Session) stripeObject;
                handleCheckoutSessionCompleted(session);
                break;
            // Handle other event types as needed
            default:
                System.out.println("Unhandled event type: " + event.getType());
                break;
        }

        return new ResponseEntity<>("Received", HttpStatus.OK);
    }

    private void handleCheckoutSessionCompleted(Session session) {
        // Retrieve communityId from metadata
        String communityIdStr = session.getMetadata().get("communityId");
        if (communityIdStr != null) {
            Long communityId = Long.parseLong(communityIdStr);
            Long amountTotal = session.getAmountTotal(); // Amount in cents
            Double amountInDollars = amountTotal / 100.0;
            communityService.updateCommunityContribution(communityId, amountInDollars);
            System.out.println("Community " + communityId + " received a contribution of " + amountInDollars);
        }
    }
}