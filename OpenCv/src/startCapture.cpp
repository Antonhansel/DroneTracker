/* 
* @Author: antonhansel
* @Date:   2014-10-08 19:19:20
* @Last Modified by:   antonhansel
* @Last Modified time: 2014-10-09 10:14:07
*/

#include "startCapture.hpp"

using namespace cv;

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
		detectAndDisplay(frame);
		int c = cv::waitKey(1);
		if((char)c == 27) 
			break;
	}
}

void 	startCapture::detectAndDisplay(cv::Mat frame)
{
	std::vector<Rect> faces;
	cv::Mat frame_gray;

	cvtColor(frame,frame_gray, COLOR_BGR2GRAY );
	equalizeHist( frame_gray, frame_gray);

	face_cascade.detectMultiScale(frame_gray, faces, 1.1, 2, 0|CASCADE_SCALE_IMAGE, Size(30, 30));
	for (size_t i = 0; i < faces.size();i++)
	{
		cv::Point center(faces[i].x +faces[i].width/2, faces[i].y + faces[i].height/2);
		cv::ellipse(frame, center, cv::Size(faces[i].width/2, faces[i].height/2), 0, 0, 360, Scalar(255, 0, 255), 4, 8, 0);

		cv::Mat faceROI = frame_gray(faces[i]);
		std::vector<Rect> eyes;

		eyes_cascade.detectMultiScale(faceROI, eyes, 1.1, 2, 0 |CASCADE_SCALE_IMAGE, Size(30, 30));

		for (size_t j = 0; j < eyes.size(); j++)
		{
			cv::Point eye_center( faces[i].x + eyes[j].x + eyes[j].width/2, faces[i].y + eyes[j].y + eyes[j].height/2 );
			int radius = cvRound((eyes[j].width + eyes[j].height)* 0.25);
			circle(frame, eye_center, radius, Scalar(255, 0, 0), 4, 8, 0);
		}
	}
	HOGDescriptor hog;
	hog.setSVMDetector(HOGDescriptor::getDefaultPeopleDetector());

	vector<Rect> found, found_filtered;
	hog.detectMultiScale(frame, found, 0, Size(8,8), Size(32,32), 1.05, 2);

	size_t i, j;
	for (i=0; i<found.size(); i++)
	{
		Rect r = found[i];
		for (j=0; j<found.size(); j++)
			if (j!=i && (r & found[j])==r)
				break;
			if (j==found.size())
				found_filtered.push_back(r);
		}
		for (i=0; i<found_filtered.size(); i++)
		{
			Rect r = found_filtered[i];
			r.x += cvRound(r.width*0.1);
			r.width = cvRound(r.width*0.8);
			r.y += cvRound(r.height*0.06);
			r.height = cvRound(r.height*0.9);
			rectangle(frame, r.tl(), r.br(), cv::Scalar(0,255,0), 2);
		}
		imshow("Detect face and body", frame);
	}

	startCapture::~startCapture()
	{}
