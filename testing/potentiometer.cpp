#include <iostream>
#include <pigpio.h>

using namespace std;

int main() {
  // Initialize pigpio library (needs to be run with sudo)
  if (gpioInitialise() < 0) {
    std::cerr << "pigpio initialization failed!" << std::endl;
    return 1;
  }

  // Set BCM 14 as input pin
  gpioSetMode(17, PI_INPUT);

  // Read the current state of the LED (0 - off, 1 - on)
  int level = gpioRead(17);

  cout << "Reading is: " << level << endl;

  // Print the state of the LED
  if (level == 0) {
    cout << "LED is OFF" << endl;
  } else {
    cout << "LED is ON" << endl;
  }

  // Clean up pigpio library
  gpioTerminate();

  return 0;
}