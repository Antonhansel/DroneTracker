
NAME =  opencv

SOURCES = src/main.cpp \

OBJECT = $(SOURCES:.cpp=.o)

CXX = g++

CXXFLAGS = `pkg-config --cflags opencv`
LIBS = `pkg-config --libs opencv`

all: $(NAME)

$(NAME): $(OBJECT)
	g++ $(SOURCES) $(CXXFLAGS) $(LIBS)

clean:
	rm -f $(OBJECT)

fclean: clean
	rm -f $(NAME)

re: fclean all
