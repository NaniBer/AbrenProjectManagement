<<<<<<< HEAD
// import React from "react";
// import Card from "./Card";
// import { Droppable, Draggable } from "react-beautiful-dnd";

// const Column = ({ column, tasks }) => {
//   return (
//     <div className="column" >
//       <h2>{column.title}</h2>
//       <Droppable droppableId={column.id}>
//         {(provided) => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {tasks.map((task, index) => (
//               <Draggable key={task.id} draggableId={task.id} index={index}>
//                 {(provided) => (
//                   <div
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     ref={provided.innerRef}
//                   >
//                     <Card task={task} />
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// };

// export default Column;
=======
import React from "react";
import Card from "./Card";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {
  return (
    <div className="column">
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <Card task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
>>>>>>> 0d0ec9c507e0997f1bd8c03263731b8b1ba43e08
