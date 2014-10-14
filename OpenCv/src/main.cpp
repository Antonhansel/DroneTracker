#include "startCapture.hpp"

int main(int argc, char **argv)
{
	QApplication 	app(argc, argv);
	startCapture *capture = new startCapture();
	return (app.exec());
}
