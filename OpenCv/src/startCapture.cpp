/* 
* @Author: antonhansel
* @Date:   2014-10-08 19:19:20
* @Last Modified by:   antonhansel
* @Last Modified time: 2014-10-09 09:20:21
*/

#include "startCapture.hpp"

startCapture::startCapture()
{
	cv::VideoCapture capture;
	cv::Mat frame;

	this->face_cascade_path = "cascade/haarcascade_frontalface_alt.xml";
	this->eyes_cascade_path = "cascade/haarcascade_frontalface_alt.xml";

	if(!this->face_cascade.load(this->face_cascade_path))
	{ 
		std::cout << "--(!)Error loading face cascade" << std::endl;; 
		exit(1); 
	}
	if(!this->eyes_cascade.load(this->eyes_cascade_path))
	{ 
		std::cout << "--(!)Error loading eyes cascade" << std::endl;
		exit(1); 
	}
	capture.open(-1);
	if (!capture.isOpened()) 
	{ 
		std::cout << "--(!)Error opening video capture\n" << std::endl;
		exit(1);
	}

	while (capture.read(frame))
	{
		if(frame.empty())
		{
			std::cout << " --(!) No captured frame -- Break!" << std::endl;
			break;
		}
		//detectAndDisplay(frame);
		int c = cv::waitKey(5);
		if((char)c == 27) 
			break; 
	}
}

startCapture::~startCapture()
{}
