json.id project.id
json.ownerId project.owner_id
json.teamId project.team_id
json.name project.name
json.color project.color
json.description project.description
json.taskIds project.tasks.map(&:id)
