import React, { Component } from 'react';
import EventTable from './EventTable';

class RefreshingEventTable extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    this.getEvents();
  }

  async fetch(method, endpoint, body) {
    const { api } = this.props;

    try {
      const res = await fetch(`${api}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getEvents() {
    const { refreshInterval } = this.props;
    this.setState({ events: await this.fetch('get', '/events') });
    if (refreshInterval && refreshInterval > 0) {
      setTimeout(() => this.getEvents(), refreshInterval * 1000);
    }
  }

  render() {
    const { events } = this.state;

    return (
      <EventTable events={events} />
    )
  }
}

export default RefreshingEventTable;
