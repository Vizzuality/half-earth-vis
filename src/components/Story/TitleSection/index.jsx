import React from 'react';
import Mouse from '../../Mouse';
import './style.scss';


class TitleSection extends React.Component{

  render() {
    return (
      <div className="c-title-section">
        <h2 className={"title-section " + this.props.align}>{this.props.text}</h2>
      </div>
    );
  }

}

TitleSection.propTypes = {
  text: React.PropTypes.string,
};

export default TitleSection;
