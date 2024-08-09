import React from "react";

import { CoursePart } from "../types/index";

const StringList = ({ strings }) => {
	return (
		<ul>
			{strings.map((str, index) => (
				<li key={index}>{str}</li>
			))}
		</ul>
	);
};

interface PartProps {
	part: CoursePart;
}

const Part = ({ part }: PartProps) => {
	switch (part.kind) {
		case "basic":
			return (
				<div>
					<h3>
						{part.name} {part.exerciseCount}
					</h3>
					<p>
						<em>{part.description}</em>
					</p>
				</div>
			);
		case "background":
			return (
				<div>
					<h3>
						{part.name} {part.exerciseCount}
					</h3>
					<p>
						<em>{part.description}</em>
					</p>
					<p>submit to {part.backgroundMaterial}</p>
				</div>
			);
		case "group":
			return (
				<div>
					<h3>
						{part.name} {part.exerciseCount}
					</h3>
					<p>project exercises {part.groupProjectCount}</p>
				</div>
			);
		case "special":
			return (
				<div>
					<h3>
						{part.name} {part.exerciseCount}
					</h3>
					<p>
						<em>{part.description}</em>
					</p>
					<p>
						required skills <StringList strings={part.requirements} />
					</p>
				</div>
			);
		default:
			return null;
	}
};

export default Part;
