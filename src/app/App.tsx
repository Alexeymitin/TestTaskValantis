import { useEffect, useState } from "react";
import { Table } from "../components/TableItems/Table/ui/Table";
import "./App.css";
import { Actions, customFetch } from "../api/api";
import { fetchItems } from "../api/fetchItems";

const App = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const data = fetchItems(0, 50);
		if (data !== undefined) {
			setProducts(data);
		}
	}, [products]);

	return (
		<div className="App">
			<header className="App-header">
				<Table data={products} />
			</header>
		</div>
	);
};

export default App;
