json.id task.id
json.ownerId task.owner_id
json.projectId task.project_id
json.parentId task.parent_id
json.assigneeId task.assignee_id
json.name task.name
json.description task.description
json.completed task.completed
json.due_on task.due_on
json.due_at task.due_at
json.subtaskIds task.subtasks.map(&:id)
