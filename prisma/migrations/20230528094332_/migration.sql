-- CreateTable
CREATE TABLE "routers" (
    "router_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "routers_pkey" PRIMARY KEY ("router_id")
);

-- CreateTable
CREATE TABLE "sensors" (
    "sensor_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "router_id" UUID NOT NULL,

    CONSTRAINT "sensors_pkey" PRIMARY KEY ("sensor_id")
);

-- CreateTable
CREATE TABLE "events" (
    "eventId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "packets" (
    "packet_id" UUID NOT NULL,
    "payload" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "sensor_id" UUID NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "packets_pkey" PRIMARY KEY ("packet_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "routers_mac_key" ON "routers"("mac");

-- CreateIndex
CREATE UNIQUE INDEX "sensors_mac_key" ON "sensors"("mac");

-- AddForeignKey
ALTER TABLE "sensors" ADD CONSTRAINT "sensors_router_id_fkey" FOREIGN KEY ("router_id") REFERENCES "routers"("router_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packets" ADD CONSTRAINT "packets_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensors"("sensor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packets" ADD CONSTRAINT "packets_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;
