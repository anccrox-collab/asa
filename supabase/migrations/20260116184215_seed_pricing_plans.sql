-- Clear existing plans
DELETE FROM pricing_plans;

-- =========================
-- Institution Plans
-- =========================
INSERT INTO pricing_plans (plan_type, name, price, currency, features, active) VALUES
(
  'institution',
  'Basic',
  49,
  'usd_month',
  '{
    "credentials_per_month": 100,
    "support": "email",
    "analytics": "basic",
    "api_access": false,
    "custom_branding": false,
    "priority_support": false,
    "white_label": false,
    "bulk_minting": false
  }'::jsonb,
  true
),
(
  'institution',
  'Pro',
  149,
  'usd_month',
  '{
    "credentials_per_month": 500,
    "support": "priority",
    "analytics": "advanced",
    "api_access": true,
    "custom_branding": true,
    "priority_support": true,
    "white_label": false,
    "bulk_minting": false
  }'::jsonb,
  true
),
(
  'institution',
  'Enterprise',
  399,
  'usd_month',
  '{
    "credentials_per_month": -1,
    "support": "dedicated",
    "analytics": "advanced",
    "api_access": true,
    "custom_branding": true,
    "priority_support": true,
    "white_label": true,
    "bulk_minting": true,
    "sla_guarantee": true,
    "custom_integrations": true
  }'::jsonb,
  true
); 
