import React, { useState } from "react";
import Board, { moveCard } from "@asseinfo/react-kanban";
import {
  Box,
  Button,
  useTheme,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "@asseinfo/react-kanban/dist/styles.css";

const board = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "Card content",
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content",
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content",
        },
      ],
    },
    {
      id: 2,
      title: "Doing",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          description: "Card content",
        },
      ],
    },
    {
      id: 3,
      title: "Q&A",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content",
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content",
        },
      ],
    },
    {
      id: 4,
      title: "Production",
      cards: [
        {
          id: 12,
          title: "Card title 12",
          description: "Card content",
        },
        {
          id: 13,
          title: "Card title 13",
          description: "Card content",
        },
      ],
    },
  ],
};

function ControlledBoard() {
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  const handleColumnAdded = (newBoard, newColumn) => {
    console.info("Column added!");
    setBoard(newBoard);
  };

  const handleColumnConfirmed = (newColumnName) => {
    console.info("Column id requested");
    const newColumn = {
      id: "testing-but-this-should-be-unique",
      ...newColumnName,
    };
    return newColumn;
  };

  return (
    <Board
      onCardDragEnd={handleCardMove}
      disableColumnDrag
      allowAddColumn={true}
      onNewColumnConfirm={handleColumnConfirmed}
      onColumnNew={handleColumnAdded}
    >
      {controlledBoard.columns.map((column) => (
        <Board.Column key={column.id} title={column.title}>
          {column.cards.map((card) => (
            <Board.Card
              key={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </Board.Column>
      ))}
    </Board>
  );
}

function UncontrolledBoard() {
  return (
    <Board
      allowRemoveLane
      allowRenameColumn
      allowRemoveCard
      onLaneRemove={console.log}
      onCardRemove={console.log}
      onLaneRename={console.log}
      initialBoard={board}
      allowAddCard={{ on: "top" }}
      onNewCardConfirm={(draftCard) => ({
        id: new Date().getTime(),
        ...draftCard,
      })}
      onCardNew={console.log}
    />
  );
}

function Kanban() {
  return (
    <>
      <h4>Example of an uncontrolled board</h4>
      <UncontrolledBoard />
      <h4>Example of a controlled board</h4>
      <p>Just the card moving is implemented in this demo.</p>
      <p>
        In this kind of board, you can do whatever you want. We just mirror your
        board state.
      </p>
      <ControlledBoard />
    </>
  );
}
export default Kanban;
