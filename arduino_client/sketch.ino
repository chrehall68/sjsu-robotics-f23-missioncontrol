#include <Wire.h>
#include <Servo.h>
#include <math.h>

// basic print
template <typename T, typename... Args>
void print(T val, Args... args)
{
    Serial.print(val);
    print(args...);
}
template <typename T>
void print(T val)
{
    Serial.print(val);
}
template <typename T, typename... Args>
void println(T val, Args... args)
{
    print(val, args...);
    Serial.print("\n");
}

// servos should be digital
namespace constants
{
    const int sda = 4; // a4
    const int scl = 5; // a5

    const int servoPort = 2; // d2
}

// based on datasheet from
// https://cdn.sparkfun.com/datasheets/Sensors/Accelerometers/RM-MPU-6000A.pdf
namespace mpu6050
{
    const char address = 0x68;
    const char accelXOut = 59;
    const char accelYOut = 61;
    const char accelZOut = 63;

    const char gyroXOut = 0x43;
    const char gyroYOut = 0x45;
    const char gyroZOut = 0x47;

    char read8(char reg)
    {
        Wire.beginTransmission(address);
        Wire.write(reg);
        Wire.endTransmission();

        int available = Wire.requestFrom(address, 1);
        if (available != 1)
        {
            println("ERROR: unable to request");
            return '\0';
        }
        return Wire.read();
    }

    int read16(char reg)
    {
        Wire.beginTransmission(address);
        Wire.write(reg);
        int ret = Wire.endTransmission();
        if (ret != 0)
        {
            println("ERROR!!");
        }

        int available = Wire.requestFrom(0x68, 2);
        if (available != 2)
        {
            println("ERROR: unable to request");
            return 0;
        }
        int high = Wire.read(); // high byte
        int low = Wire.read();  // low byte
        return (high << 8) + low;
    }
    void write8(char reg, char val)
    {
        Wire.beginTransmission(address);
        Wire.write(reg);
        Wire.write(val);
        int ret = Wire.endTransmission();
        if (ret != 0)
        {
            println("FAILED TO WRITE!!");
            Serial.println(ret, HEX);
        }
    }

    void verifyDetectable()
    {
        Wire.beginTransmission(address);
        int ret = Wire.endTransmission();

        if (ret == 0)
        {
            println("mpu6050 is detectable");
        }
        else
        {
            println("mpu6050 is not detectable, please make sure it is wired correctly. Failed detecting with error ", (int)address);
        }
    }

    void verifyWhoAmI()
    {
        // select the chip and the register
        char identity = read8(117);
        if (identity == 0x68)
        {
            println("mpu6050 identified itself correctly");
        }
        else
        {
            Serial.println(identity, HEX);
            println("something went wrong; got ", (int)identity, " instead of 0x68");
        }
    }
};

// globals

// used to control the servo
Servo servo;

void setup()
{
    Serial.begin(9600);
    servo.attach(constants::servoPort);

    // imu
    Wire.begin();
    mpu6050::verifyDetectable();
    mpu6050::verifyWhoAmI();
    mpu6050::write8(107, 0); // write a reset to the reset register
}

void loop()
{
    // format for reading / writing is write the address you want to request from
    // and then read
    int ax, ay, az, gx, gy, gz;
    ax = mpu6050::read16(mpu6050::accelXOut);
    ay = mpu6050::read16(mpu6050::accelYOut);
    az = mpu6050::read16(mpu6050::accelZOut);

    gx = mpu6050::read16(mpu6050::gyroXOut);
    gy = mpu6050::read16(mpu6050::gyroYOut);
    gz = mpu6050::read16(mpu6050::gyroZOut);

    int curPosition = servo.read();

    println("x accel: ", ax, ", y accel: ", ay, ", z accel: ", az, ", x gyro: ", gx, ", y gyro: ", gy, ", z gyro: ", gz, ", servo pos: ", curPosition);

    // update offset if available
    if (Serial.available())
    {
        curPosition = Serial.readString().toInt();
        if (curPosition < 0)
        {
            curPosition = 0;
        }
        if (curPosition > 180)
        {
            curPosition = 180;
        }
        servo.write(curPosition);
    }

    delay(100);
}