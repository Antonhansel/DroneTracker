#ifndef _STARTCAPTURE_HPP_
#define _STARTCAPTURE_HPP_

#include <string>
#include <stdio.h>
#include <iostream>
#include <stdio.h>
#include <opencv2/opencv.hpp>

class startCapture
{
public:
	startCapture();
	~startCapture();
protected:
	std::string face_cascade_path;
	std::string eyes_cascade_path;
	cv::CascadeClassifier face_cascade;
	cv::CascadeClassifier eyes_cascade;
};

#endif