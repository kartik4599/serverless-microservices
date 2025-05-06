CREATE TABLE "address"(
    "id" bigserial PRIMARY KEY,
    "user_id" bigint NOT NULL,
    "address_line1" varchar,
    "address_line2" varchar,
    "city" varchar,
    "state" varchar,
    "country" varchar,
    "postal_code" varchar,
    "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "address" ("city");
CREATE INDEX ON "address" ("postal_code");
CREATE INDEX ON "address" ("country");

ALTER TABLE "address" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");