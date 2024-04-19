###   B o o k U s N o w 
 
 
It is a frontend UI of a website that shows upcoming and recommended events.
The website is responsive to work in both desktop and mobile screen size. It fetches events from the provided APIs.

###   Fetching Events:-
As shown in the images above, there are two types of events. Recommended shows and upcoming events. 

#   Recommended shows:
There are only 8 recommended shows which will infinitely scroll horizontally. You can fetch the recommended events by calling the below API. The response also has img_url which should be used as the thumbnail image for the event.

#   Upcoming events:
There are several upcoming events which scroll vertically as shown in the image. You can fetch the upcoming events by calling this API. 

#   IMPORTANT: Keep in mind that the upcoming events API has several pages, you need to fetch a new page of events only when the has scrolled to the end of the page. You can show a small loading spinner while you are fetching the next page from the backend API.




