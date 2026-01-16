import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { supabase } from "./lib/supabase";

type Instrument = {
	id: number;
	name: string;
};

export default function App() {
	const [instruments, setInstruments] = useState<Instrument[]>([]);

	useEffect(() => {
		getInstruments();
	}, []);

	async function getInstruments() {
		const { data, error } = await supabase.from("instruments").select();

		if (error) {
			console.error(error);
			return;
		}

		setInstruments(data ?? []);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={instruments}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<Text style={styles.item}>{item.name}</Text>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 50,
		paddingHorizontal: 16,
	},
	item: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
});
