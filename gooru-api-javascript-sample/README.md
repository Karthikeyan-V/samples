
## About GooruApiDemo

1. The GooruApiDemo is to run gooru api's with your valid inputs.
2. The response of api call populated in JSON format.
3. The GooruApiDemo id developed using html/js files.

## Files included

* All source files (.html, .js, .css, .png, .gif, .md)

** html files

1. index.html
2. api_call_page.html
3. search_resource.html
4. create_collection.html
5. create_resource.html
6. play_collection.html

** js files

1. index.js
2. jquery.1.9.1.min.js

** css files

1. index.css

** image files

1. background.png
2. loading.gif

** text files

1. README.md

## Getting Started

** Authentication

1. All Gooru API calls must be authenticated using Session tokens. To acquire a session token you will need an API key.

** API Keys

1. Gooru uses API Key and Session token based authentication.
2. API key and Session token are a string of characters or UUID as below. 
   Session token: 9716d0ad-c970-40a9-afb0-4998c5a1f4ac.
3. An API key represents the authorization that an organization/developer has been given to access Gooru data.

** ACQUIRING AN API KEY

1. Register for a Gooru account at www.goorulearning.org.
2. Please write to partner-support@goorulearning.org with below information to acquire API Key.

a) First Name   	 	
b) Last Name    	 	
c) Email Address	 	
d) Role and Organization 
e) You are a: (school/company/Freelance Developer/Other )
f) Organization Website 
g) Email Address	 
h) Role and Organization 
i) Please describe your application(s) and how you plan on leveraging Gooru 
j) Estimated production release date (MM/DD/YYYY)
h) Additional notes/comments

** Authenticating with an API key

* Once you got an API key, making API calls is very easy and simple. Please follow the below steps

1. First you have to call the Gooru user login API call with your Gooru account credentials. The login API call will return the user details along with a session token in response.

## working steps

** Login page:

1. You must login with your valid inputs. The response will populated in same page.
2. To login you must provide api key with valid username and password.
3. After that you can click "Go Next" button to view other api call.

** Run other api call:

1. This page you can run and view the response of search resource,create collection, create resource and play collection api call.
2. The name of api calls are listed in sidebar menu. By default search resource page will show the pageload.

** Search Api call:

1. You can search any content of gooru by thi this call.
2. You can choose default session token by click the checkbox in a page. The checkbox checked when pageload default.
3. You can use your own valid session token by uncheck the checkbox and enter it in session token field.

** Create collection Api call:

1. You can create a new collection by giving collection title and collection type.
2. The session token entry is same as the search call.

** Create Resource Api call:

1. You can create a new resource by giving valid collection id and resource title.
2. The session token entry is same as the search call.

** Fetch Collection Api call:

1. Fetch collection is none other than get collection call.
2. You can see the collection details by giving valid collection id.
3. The session token entry is same as the search call.
