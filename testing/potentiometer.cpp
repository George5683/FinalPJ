#include <pigpio.h>
#include <iostream>

#define SPI_CLK  11 // BCM 11 (SCLK)
#define SPI_MOSI 10 // BCM 10 (MOSI)
#define SPI_MISO  9  // BCM 9  (MISO)
#define SPI_CS   8  // BCM 8  (CE0)
int LOW = 0;
int HIGH = 1;

#define CHANNEL 0 // Channel connected to potentiometer (can be 0-7)

int main() {
  // Initialize pigpio library
  if (gpioInitialise() < 0) {
    std::cerr << "pigpio initialization failed!" << std::endl;
    return 1;
  }

  // Set SPI pins as outputs (except MISO)
  gpioSetMode(SPI_CLK, PI_OUTPUT);
  gpioSetMode(SPI_MOSI, PI_OUTPUT);
  gpioSetMode(SPI_CS, PI_OUTPUT);

  while (true) {
    // Set chip select low to start communication
    gpioWrite(SPI_CS, LOW);

    // Create a buffer for data transmission (MCP3008 sends 12 bits + null bits)
    uint16_t data = 0x03 << 11; // Start bit, single ended mode, channel select

    // Send first 8 bits (MSB) with clock pulses
    for (int i = 0; i < 8; i++) {
      gpioWrite(SPI_CLK, LOW);
      gpioWrite(SPI_MOSI, data & 0x80);
      data <<= 1;
      gpioWrite(SPI_CLK, HIGH);
    }

    // Read 12 bits (data + null bits) with clock pulses (MSB first)
    uint16_t adc_value = 0;
    for (int i = 0; i < 12; i++) {
      gpioWrite(SPI_CLK, LOW);
      adc_value <<= 1;
      adc_value |= gpioRead(SPI_MISO);
      gpioWrite(SPI_CLK, HIGH);
    }

    // Set chip select high to end communication
    gpioWrite(SPI_CS, HIGH);

    // Print the ADC value (0 to 4095 for a 12-bit ADC)
    std::cout << "ADC Value: " << adc_value << std::endl;

    // Delay between readings (optional)
    gpioDelay(1000000); // Delay in microseconds
  }

  // Terminate pigpio library (optional)
  gpioTerminate();

  return 0;
}
