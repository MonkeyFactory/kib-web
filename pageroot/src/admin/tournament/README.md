INACURATE
-------


# Tournament engine

The KiB tournament engine provides support for tournament managment. This includes adding players, creating matchups and checking scoreboard.

## Pages

### Add/Edit listing of tournaments (/admin/tournament)

List existing tournaments, allows the admin to add new tournaments and edit existing ones (provided that no matchups have been generated).

### Main tournament admin page (/admin/tournament/[\d]*)

This page contains a series of tabs containg the following:

 * Player managment
 * 0-n tabs for the different rounds in the tournament. A new will be added for each new generated matchup
 * Generate new matchup. Only possible of score has been reported for all matches in the current round.
 * Scoreboard
 
#### Player managment tab

Players can be added from 3 different sources

 1. KiB forum 
 2. svenska40k player list
 3. Direct input of player names
 
The data model is defined like this:
```javascript
{
	source: 1, /* Same index order as the list above */
	name: 'Olle Bolle',
	active: true, /* If this is set to false the player has dropped */
	originalObject: { /* Original data from the source */}
}
```
	

