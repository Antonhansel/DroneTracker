#include <iostream>
#include <string>
#include <opencv2/opencv.hpp>
#include <stdio.h>

using namespace cv;

std::string window_name = "Capture - Face detection";
RNG rng(12345);

void detectAndDisplay(Mat, CascadeClassifier&);

int main(int ac, char **av)
{
  char key;
  CvCapture *capture;
  CascadeClassifier face_cascade;
  Mat frame;

  if (ac != 1)
    {
      std::cout << "No Input File" << std::endl;
      exit(0);
    }
  else
    {
      if (!face_cascade.load("cascade/haarcascade_frontalface_alt.xml"))
        std::cout << "ERROR" << std::endl;
      capture = cvCaptureFromCAM(0);
      if (capture)
        {
          while (key != 'q' || key != 'Q')
            {
              frame = cvQueryFrame(capture);
              if (!frame.empty())
                detectAndDisplay(frame, face_cascade);
                key = cvWaitKey(10);
            }
        }
    }
  cvReleaseCapture(&capture);
  return 0;
}

void detectAndDisplay(Mat frame, CascadeClassifier &face_cascade)
{
  std::vector<Rect> faces;
  Mat frame_gray;

  cvtColor( frame, frame_gray, CV_BGR2GRAY );
  equalizeHist( frame_gray, frame_gray );

  //-- Detect faces
  face_cascade.detectMultiScale( frame_gray, faces, 1.1, 2, 0 | CV_HAAR_SCALE_IMAGE, Size(30, 30) );

  for( size_t i = 0; i < faces.size(); i++ )
  {
    Point center( faces[i].x + faces[i].width*0.5, faces[i].y + faces[i].height*0.5 );
    ellipse( frame, center, Size( faces[i].width*0.5, faces[i].height*0.5), 0, 0, 360, Scalar( 255, 0, 255 ), 4, 8, 0 );

    Mat faceROI = frame_gray( faces[i] );
    std::vector<Rect> eyes;

    /*//-- In each face, detect eyes
    eyes_cascade.detectMultiScale( faceROI, eyes, 1.1, 2, 0 |CV_HAAR_SCALE_IMAGE, Size(30, 30) );

    for( size_t j = 0; j < eyes.size(); j++ )
     {
       Point center( faces[i].x + eyes[j].x + eyes[j].width*0.5, faces[i].y + eyes[j].y + eyes[j].height*0.5 );
       int radius = cvRound( (eyes[j].width + eyes[j].height)*0.25 );
       circle( frame, center, radius, Scalar( 255, 0, 0 ), 4, 8, 0 );
     }*/
  }
  //-- Show what you got
  imshow( window_name, frame );
}
