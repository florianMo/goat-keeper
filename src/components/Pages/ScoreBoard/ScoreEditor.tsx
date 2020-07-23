import { blue, cyan, lime, red } from '@ant-design/colors';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

enum LeaderCode {
  EQ = 'EQ',
  T1 = 'T1',
  T2 = 'T2',
}

interface ScoreEditorProps {
  t1Score: number;
  t2Score: number;
  onIncrementT1: () => void;
  onDecrementT1: () => void;
  onIncrementT2: () => void;
  onDecrementT2: () => void;
}

export const ScoreEditor: React.FC<ScoreEditorProps> = (props: ScoreEditorProps): JSX.Element => {
  const leader: LeaderCode =
    props.t1Score > props.t2Score ? LeaderCode.T1 : props.t1Score < props.t2Score ? LeaderCode.T2 : LeaderCode.EQ;

  return (
    <StyedScoreEditor>
      <div className="side left">
        <div className="score-controls">
          <FontAwesomeIcon icon={faChevronUp} size="lg" onClick={props.onIncrementT1} />
          <FontAwesomeIcon icon={faChevronDown} size="lg" onClick={props.onDecrementT1} />
        </div>
        <span className={`score t1 leader${leader}`}>{props.t1Score}</span>
      </div>
      <div className="side right">
        <span className={`score t2 leader${leader}`}>{props.t2Score}</span>
        <div className="score-controls">
          <FontAwesomeIcon icon={faChevronUp} size="lg" onClick={props.onIncrementT2} />
          <FontAwesomeIcon icon={faChevronDown} size="lg" onClick={props.onDecrementT2} />
        </div>
      </div>
    </StyedScoreEditor>
  );
};

const StyedScoreEditor = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  .side {
    display: flex;
    align-items: center;
    user-select: none;

    svg {
      transition: 0.3s all;
      color: ${cyan[8]};

      &:hover {
        color: ${cyan[6]};
      }
    }

    .score {
      width: 80px;
      text-align: center;
      font-size: 44px;
      font-weight: 700;
      padding: 4px;
      background-color: ${blue[4]};
      color: white;

      &.t1.leaderT1,
      &.t2.leaderT2 {
        background-color: ${lime[7]};
      }

      &.t1.leaderT2,
      &.t2.leaderT1 {
        background-color: ${red[6]};
      }
    }

    .score-controls {
      width: 40px;
      padding: 4px;
      display: flex;
      flex-direction: column;
      background-color: ${cyan[8]};

      svg {
        color: white;
        margin: 8px;
        cursor: pointer;
        transition: 0.3s all;

        &:hover {
          color: ${cyan[7]};
        }
      }
    }

    &.left {
      .score-controls {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }

    &.right {
      .score-controls {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
`;
