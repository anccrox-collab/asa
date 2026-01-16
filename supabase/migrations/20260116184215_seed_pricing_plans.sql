/*
  # Seed Pricing Plans

  1. Data
    - Insert pricing plans for institutions (Basic, Pro, Enterprise)
    - Insert pricing plans for employers (Basic, Pro)
    - All plans include detailed feature descriptions

  2. Notes
    - Students always have free unlimited access (no plan needed)
    - Promo codes can be applied at checkout
*/

-- Clear any existing plans (for idempotency)
DELETE FROM pricing_plans;

-- Institution Plans
INSERT INTO pricing_plans (plan_type, name, price, currency, features, active) VALUES
(
  'institution',
  'Basic',
  49,
  'month',
  '{
    "credentials_per_month": 100,
    "email_support": true,
    "basic_analytics": true,
    "api_access": false,
    "priority_support": false,
    "white_label": false,
    "bulk_minting": false,
    "dedicated_support": false,
    "custom_integrations": false
  }'::jsonb,
  true
),
(
  'institution',
  'Pro',
  199,
  'month',
  '{
    "credentials_per_month": 500,
    "email_support": true,
    "basic_analytics": true,
    "api_access": true,
    "priority_support": true,
    "advanced_analytics": true,
    "white_label": false,
    "bulk_minting": false,
    "dedicated_support": false,
    "custom_integrations": false
  }'::jsonb,
  true
),
(
  'institution',
  'Enterprise',
  0,
  'custom',
  '{
    "credentials_per_month": -1,
    "email_support": true,
    "basic_analytics": true,
    "api_access": true,
    "priority_support": true,
    "advanced_analytics": true,
    "white_label": true,
    "bulk_minting": true,
    "dedicated_support": true,
    "custom_integrations": true,
    "sla_guarantee": true,
    "custom_contract": true
  }'::jsonb,
  true
);

-- Employer/Verifier Plans
INSERT INTO pricing_plans (plan_type, name, price, currency, features, active) VALUES
(
  'employer',
  'Basic',
  29,
  'month',
  '{
    "verifications_per_month": 50,
    "email_support": true,
    "verification_history": true,
    "api_access": false,
    "bulk_verification": false,
    "priority_support": false
  }'::jsonb,
  true
),
(
  'employer',
  'Pro',
  99,
  'month',
  '{
    "verifications_per_month": -1,
    "email_support": true,
    "verification_history": true,
    "api_access": true,
    "bulk_verification": true,
    "priority_support": true,
    "advanced_reporting": true,
    "webhook_notifications": true
  }'::jsonb,
  true
);