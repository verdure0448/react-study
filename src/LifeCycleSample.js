import React, { Component } from "react";

/**
 * 마운트, 업데이트, 언마운트
 * 마운트는 constructor -> getDerivedStateFromProps -> render -> componentDidMount
 * 업데이트는 prop 변경, state 변경, 부모 컴포넌트 리렌더링일 경우이며
 *  getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate
 */
class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null;

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  /**
   * props로 받아온 값을 state에 동기화시키는 용도로 사용하며, 컴포넌트가 마운트될때와 업데이트될 때 호출된다
   * @param {*} nextProps
   * @param {*} prevState
   * @returns state
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps", nextProps.color, prevState.color);
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }

    return null;
  }

  /**
   * 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 호출되며 다른 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록 setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리
   */
  componentDidMount() {
    console.log("componentDidMount");
  }

  /**
   * props 또는 state를 변경했을 때 호출되며, 리렌더링을 시작할지 여부를 지정하는 메서드
   * @param {*} nextProps
   * @param {*} nextState
   * @returns bool 리렌더링 여부
   */
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);

    return nextState.number % 10 !== 4;
  }

  /**
   * 컴포넌트를 DOM에서 제거되기전 호출되는 메서드, componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있을경우 제거작업 처리를 한다
   */
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  /**
   * render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출, 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용(스크롤바 위치 유지)
   * @param {*} prevProps
   * @param {*} prevState
   * @returns
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate", prevProps.color, this.props.color);

    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  /**
   * 리렌더링 완료후 호출, 업데이트가 끝난 직후 이므로, DOM관련 처리를 해도 무방, getSnapshotBeforeUpdate에서 반환한 값이 있다면 여기서 snapshot값을 전달 받을수 있다
   * @param {*} prevProps
   * @param {*} prevState
   * @param {*} snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("업데이트되기 직전 색상: " + snapshot);
    }
  }

  render() {
    console.log("render");

    const style = {
      color: this.props.color,
    };
    return (
      <div>
        {this.props.missing.value}
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
