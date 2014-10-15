#include "startCapture.hpp"
#include <ardrone_api.h>
#include <ardrone_tool/ardrone_tool.h>

int main(int argc, char **argv)
{
	QApplication 	app(argc, argv);

	C_RESULT res;
	res = ardrone_tool_setup_com( NULL );
	if( VP_FAILED(res) )
	{
		printf("Wifi initialization failed. It means either:\n");
		printf("\t* you're not root (you can set up wifi connection only as root)\n");
		printf("\t* wifi device is not present (on your pc or on your card)\n");
		printf("\t* you set the wrong name for wifi interface (for example rausb0 instead of wlan0) \n");
		printf("\t* ap is not up (reboot card or remove wifi usb dongle)\n");
		printf("\t* wifi device has no antenna\n");
	}
	else
	{
		res = ardrone_tool_init(argc, argv);
		while( VP_SUCCEEDED(res) && ardrone_tool_exit() == FALSE )
		{
			res = ardrone_tool_update();
		}
		res = ardrone_tool_shutdown();
	}

	startCapture *capture = new startCapture();
	return (app.exec());
}
