# Uber Coding Challenge

Uber clients are able to store favorite locations for easy pickup requests. Create a backend and a frontend for managing favorite locations.

This is a simple exercise, but organize, design and test your code as if it were going into production.

When you’re done, host it somewhere and provide us with a URL to the running project and a link to the source on github.

## Backend

Using the language (Python preferred), libraries and data store of your choosing, create a JSON in/out RESTful API for managing favorite locations. Stay away from Django or Rails, but microframeworks like Flask (preferred), Sinatra or Express are fine.

Attributes of a favorite location object include:

- id
- lat
- lng
- address (e.g. 800 Market Street, San Francisco, CA 94114)
- name (e.g. Work)

## Frontend

Using JavaScript, Backbone.js (preferred) and any other libraries of your choosing, create an interface to access the API. User should be able to:

- Create a new location
- Read/view a location, and a collection of all locations
- Update an existing location
- Delete a location

The UX is up to you, with a couple of constraints:

- Incorporate a map
- Geocode the address so the user is not required to enter lat/lng


## Requirements

* [Node.js](http://nodejs.org/) >= 0.10.28


## Install [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

1. Install [node.js](http://nodejs.org/).
2. Install [grunt](http://gruntjs.com/): `[sudo] npm install -g grunt-cli`
3. `git clone https://github.com/fyockm/uber.git && cd uber && npm install`

# Test

```
grunt
```

## Documentation


## Issues

Please report issues, new features, or requests in this repo's [issue tracker](https://github.com/fyockm/uber/issues).

## License

Distributed under [MIT License](LICENSE).
