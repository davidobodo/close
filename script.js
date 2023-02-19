const { Fragment, useState, memo } = React;

// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it. === DONE
// 2. Multiple items can be selected at a time. === DONE
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance). ===DONE
// 4. Currently selected items should be visually highlighted. ===DONE
// 5. Currently selected items' names should be shown at the top of the page. ===DONE
//
// Feel free to change the component structure at will.

const List = ({ items }) => {
	const [selected, setSelected] = useState([]);

	const onClick = (e) => {
		const value = e.target.dataset.val;
		if (!value) return;

		const isPresent = selected.find((item) => item === value);
		if (isPresent) {
			setSelected(selected.filter((item) => item !== value));
		} else {
			setSelected([...selected, value]);
		}
	};

	return (
		<Fragment>
			{selected.length > 0 ? (
				<section className="Selected">
					<h2>Selected Options</h2>
					<ul className="Selected__list">
						{selected.map((item, i) => (
							<div key={item}>
								{i + 1}. {item}
							</div>
						))}
					</ul>
				</section>
			) : null}

			<section>
				<h2>All Options</h2>
				<ul className="List" draggable={true} onClick={onClick} onDragOver={() => console.log("HEERE")}>
					{items.map((item) => (
						<ListItem key={item.name} name={item.name} color={item.color} isSelected={selected.includes(item.name)} />
					))}
				</ul>
			</section>
		</Fragment>
	);
};

const ListItem = memo(({ name, color, isSelected }) => {
	return (
		<li
			key={name}
			className={`List__item List__item--${color} ${isSelected ? `Invert__item Invert__item--${color}` : ""}`}
			data-val={name}
		>
			{name}
		</li>
	);
});

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ["tiny", "small", "medium", "large", "huge"];
const colors = [
	"navy",
	"blue",
	"aqua",
	"teal",
	"olive",
	"green",
	"lime",
	"yellow",
	"orange",
	"red",
	"maroon",
	"fuchsia",
	"purple",
	"silver",
	"gray",
	"black",
];
const fruits = ["apple", "banana", "watermelon", "orange", "peach", "tangerine", "pear", "kiwi", "mango", "pineapple"];

const items = sizes.reduce(
	(items, size) => [
		...items,
		...fruits.reduce(
			(acc, fruit) => [
				...acc,
				...colors.reduce(
					(acc, color) => [
						...acc,
						{
							name: `${size} ${color} ${fruit}`,
							color,
						},
					],
					[]
				),
			],
			[]
		),
	],
	[]
);

ReactDOM.render(<List items={items} />, document.getElementById("root"));
