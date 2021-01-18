import React from 'react';
import PropTypes from 'prop-types';

class Matrix extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canvas: null,
    };

    this.draw = this.draw.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.setState({canvas: this.refs.canvas}, () => {
      const columns = [];
      const context = this.state.canvas.getContext('2d');
      const size = this.props.colSize;
      const source = '0 0 1 1';
      const width = this.props.fullscreen ? window.innerWidth : this.props.width;
      const height = this.props.fullscreen ? window.innerHeight : this.props.height;
      const canvas = this.state.canvas;
      canvas.width = width;
      canvas.height = height;

      const numberOfColumns = Math.floor((width / size) * 3);

      this.setState({canvas, columns, context, size, source, numberOfColumns}, () => {
        for (let i = 0; i < numberOfColumns; i++) {
          columns.push(0);
        }

        this.draw();
        const interval = setInterval(this.draw, 50 / this.props.speed);
        this.setState({interval});

        if (this.props.fullscreen) window.addEventListener('resize', this.updateDimensions);
      });
    });
  }

  draw() {
    const context = this.state.context;
    const columns = this.state.columns;
    const numberOfColumns = this.state.numberOfColumns;

    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    context.fillStyle = this.props.color;
    context.font = '700 ' + this.props.fontSize + 'px Consolas,monaco,monospace';

    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      const index = Math.floor(Math.random() * this.state.source.length);
      const character = this.state.source[index];
      const positionX = columnIndex * this.state.size;
      const positionY = columns[columnIndex] * this.state.size;

      context.fillText(character, positionX, positionY);
      if (positionY >= this.state.canvas.height && Math.random() > 1 - this.props.frequency) {
        columns[columnIndex] = 0;
      }
      columns[columnIndex]++;
    }

    this.setState({context, columns});
  }

  updateDimensions() {
    const canvas = this.state.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  render() {
    const style = this.props.style || {};
    return (
      <div
        style={{
          ...style,
          background: '#000000',
          width: this.props.fullscreen ? '100vw' : this.props.width + 'px',
          height: this.props.fullscreen ? '100vh' : this.props.height + 'px',
          overflow: 'hidden',
          zIndex: this.props.zIndex,
        }}>
        <canvas ref="canvas" />
      </div>
    );
  }
}

Matrix.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fullscreen: PropTypes.bool,
  colSize: PropTypes.number,
  fontSize: PropTypes.number,
  interval: PropTypes.number,
  color: PropTypes.string,
  frequency: PropTypes.number,
  speed: PropTypes.number,
  style: PropTypes.object,
  zIndex: PropTypes.number,
};

Matrix.defaultProps = {
  width: 640,
  height: 480,
  fullscreen: false,
  colSize: 11,
  fontSize: 13.5,
  interval: 30,
  color: '#00cc33',
  frequency: 0.005,
  speed: 1.6,
};

export default Matrix;
