import React from "react";

import { CoursePart } from "../types";

interface ContentProps {
	courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
	return (
		<>
			{courseParts.map((part, index) => (
				<p key={index}>
					{part.name} {part.exerciseCount}
				</p>
			))}
		</>
	);
};

export default Content;
