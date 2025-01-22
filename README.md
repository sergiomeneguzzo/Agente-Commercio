Full Stack Developer ITS Exam Simulation

This project is a web application designed for Sales Agents to manage their work zones. The application integrates a database for storing information and is deployed on a server, with the URL containing the developer's full name, e.g.,:https://app-firstname-lastname.ds27dh7271aah175.westus-01.server.net.

Database Structure

The project uses the following database schema:

TAgenti (Agents)

AgenteID

Email

Password

Token

TZone (Zones)

ZonaID

AgenteID

Cap

TPlaces (Places)

PlaceID

ZonaID

PlaceName

Longitude

Latitude

Server-Side (Web API)

The server is implemented using the chosen backend technology and provides the following REST API endpoints:

Register Agent (POST)Registers a new agent with Email and Password.

Inserts into TAgenti if the email does not already exist.

Agent Login (POST)Authenticates an agent with Email and Password.

Returns a valid Token (expires in 10 minutes).

Change Password (PUT)Allows an authorized agent (via a valid Token) to change their password.

Receives Token, Email, CurrentPassword, and NewPassword.

Add Zone (POST)Allows an authorized agent (via a valid Token) to add a work zone.

Receives Token, AgenteID, and Cap.

Validates if the AgenteID/Cap pair already exists in TZone. If not:

Inserts the new zone into TZone.

Makes an external API call to Zippopotam to fetch places for the given Cap (e.g., https://api.zippopotam.us/it/37132).

Inserts the places (PlaceName, Longitude, Latitude) into TPlaces.

Get Agent Zones (POST)Retrieves the list of Cap values associated with an authorized agent (Token, AgenteID).

Get Places by Zone (POST)Retrieves all places (TPlaces) for a given ZonaID of an authorized agent (Token, ZonaID).

Delete a Place (DELETE)Deletes a specific place for an authorized agent (Token, PlaceID).

Delete All Places in a Zone (DELETE)Deletes all places in a specific zone for an authorized agent (Token, ZonaID).

Delete a Zone (DELETE)Deletes a zone for an authorized agent (Token, ZonaID).

If the zone has associated places, the deletion is blocked and an error message is returned.

Testing URLsEach API endpoint is provided with a testable URL for tools like Postman.

Client-Side

The client-side technology is the developer's choice and must include the following features:

Full API IntegrationThe web application must use all the developed WebAPI endpoints.

Place Map ViewIn the list of places, clicking a button should open a page displaying a map of the selected place using its coordinates (e.g., Google Maps or another mapping service).
