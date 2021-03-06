import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SubtaskListItem from './subtask_list_view_item';
import { getSubtasks } from '../../util/selectors';
import { updateTask } from '../../actions/task_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    subtasks: getSubtasks(state.entities.tasks, ownProps.taskId),
    projectId: ownProps.match.params.projectId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateTask: (task) => dispatch(updateTask(task)),
  };
};

class SubtaskList extends React.Component {

  render() {
    if(this.props.subtasks.length) {
      let subtaskElements = this.props.subtasks.map((subtask) => (
        <SubtaskListItem task={subtask}
                      key={subtask.id}
                      projectId={this.props.projectId}
                      updateTask={this.props.updateTask}
                      />
      ));
      return (
        <ul className="subtask-list">
          {subtaskElements}
        </ul>
      );
    } else {
      return (<ul></ul>);
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubtaskList)
);
