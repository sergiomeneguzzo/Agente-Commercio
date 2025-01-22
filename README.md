# ITS Full Stack Developer Exam Simulation
Web application for managing **Sales Agents** work zones. The application integrates a database and is distributed on servers with URLs like: `https://app-firstname-lastname.ds27dh7271aah175.westus-01.server.net`
## 📊 Database Structure
### TAgents
- `AgentID`
- `Email`
- `Password`
- `Token`
### TZones
- `ZoneID`
- `AgentID`
- `ZipCode`
### TPlaces
- `PlaceID`
- `ZoneID`
- `PlaceName`
- `Longitude`
- `Latitude`
## 🔗 REST API (Server)
### 👤 Agent Management
#### Agent Registration (`POST`)
- Registers new agent with `Email` and `Password`
- Verifies unique email and inserts into **TAgents**
#### Agent Login (`POST`)
- Authenticates agent with credentials
- Returns `Token` valid for **10 minutes**
#### Password Change (`PUT`)
- Requires `Token`, `Email`, `CurrentPassword`, `NewPassword`
- Updates password for authenticated agent
### 📍 Zone Management
#### Add Zone (`POST`)
- Requires `Token`, `AgentID`, `ZipCode`
- Verifies uniqueness of `AgentID/ZipCode`
- Integration with **Zippopotam API** for places
- Populates `TPlaces` with geographical data
#### List Agent Zones (`POST`)
- Retrieves ZIP codes associated with agent (`Token`, `AgentID`)
#### List Places by Zone (`POST`)
- Retrieves places in `TPlaces` for `ZoneID`
### ❌ Delete Operations
#### Delete Place (`DELETE`)
- Deletes single place (`Token`, `PlaceID`)
#### Delete Places in Zone (`DELETE`)
- Deletes all places in specific zone (`Token`, `ZoneID`)
#### Delete Zone (`DELETE`)
- Deletes zone (`Token`, `ZoneID`)
- **Blocks** deletion if associated places exist
## 🖥️ Frontend
### Required Features
- **Complete integration** with all APIs
- **Place visualization** on map (e.g., Google Maps)
- **Authentication management** and token
- **Interface** for zone and place management
### 🗺️ Map Display
- Button to open map for each place
- Display coordinates on chosen map service
## ⚙️ Testing
Each API endpoint can be tested using tools like **Postman**.
## 🛠️ Technologies
- **Backend**: Technology of choice
- **Frontend**: Framework of choice
- **Database**: SQL Server
