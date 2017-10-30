import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Route } from 'react-router-dom';

import PageHeader from './page_header';
import TaskListView from './task_list_view';
import DetailsView from './details_view';
import { updateTask, fetchTasks } from '../../actions/task_actions';
import { fetchProject } from '../../actions/project_actions';
import { receivePath } from '../../actions/ui_actions';


const mapStateToProps = (state, ownProps) => {
  const projectId = ownProps.match.params.projectId;
  const taskId = ownProps.match.params.taskId;
  const { isFetching,
          project,
        } = state.entities.projects.items[projectId] || {
          isFetching: true,
          project: null
        };
  let tasks = [];
  if (!isFetching) {
    tasks = state.entities.projects.items[projectId].taskIds.map(
      (tId) => state.entities.projects.items[tId]
    );
  }
  return {
    projectId,
    taskId,
    project,
    tasks,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    receivePath: (params) => dispatch(receivePath(params)),
    fetchTasks: () => dispatch(fetchTasks()),
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
  }
);

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, {loaded: false});
  }

  componentDidMount() {
    console.log(this.props.match.params);

    this.props.receivePath(this.props.match.params);
    this.props.fetchProject(this.props.projectId)
      .then(
        () => {
          this.props.fetchTasks()
            .then(
              () => this.setState({loaded: true})
            );
          }
        );
  }


  componentWillReceiveProps(newProps) {
    if (this.props.match.params.projectId !== newProps.match.params.projectId ||
      this.props.match.params.taskId !== newProps.match.params.taskId) {
        console.log(newProps.match.params);
        this.props.receivePath(newProps.match.params);
      }
  }

  render() {
    const { projectId, taskId, project } = this.props;
    if (this.state.loaded) {
      return (
        <div className="main-view">
          <PageHeader project={project} />
          <TaskListView />
          {
            taskId !== "list" ? (
              <DetailsView />
            ) : (
              null
            )
          }
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainView)
);
