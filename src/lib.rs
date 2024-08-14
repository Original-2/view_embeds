use wasm_bindgen::prelude::*;
use serde_json::Value;
use std::collections::HashMap;

#[wasm_bindgen]
pub fn get_top(json_str: &str, key1: &str, key2: &str, num_results: usize) -> String {
    // Parse the JSON
    let word_embeddings: Value = serde_json::from_str(json_str).unwrap();

    // Get vectors for the keys
    let v1: Vec<f64> = word_embeddings[key1]
        .as_array()
        .unwrap()
        .iter()
        .map(|v| v.as_f64().unwrap())
        .collect();
    let v2: Vec<f64> = word_embeddings[key2]
        .as_array()
        .unwrap()
        .iter()
        .map(|v| v.as_f64().unwrap())
        .collect();

    // Get all words
    let words: Vec<String> = word_embeddings.as_object()
        .unwrap()
        .keys()
        .cloned()
        .collect();

    // Get others (words not in keys)
    let others: Vec<String> = words.into_iter()
        .filter(|word| word != key1 && word != key2)
        .collect();

    // Get vectors for others
    let vectors: Vec<Vec<f64>> = others.iter()
        .map(|word| {
            word_embeddings[word].as_array()
                .unwrap()
                .iter()
                .map(|v| v.as_f64().unwrap())
                .collect()
        })
        .collect();

    // Calculate scores
let mut scores: Vec<(String, f64, f64, f64)> = Vec::new();
for (i, vec) in vectors.iter().enumerate() {
    let dot_v1: f64 = v1.iter().zip(vec).map(|(a, b)| a.abs() * b.abs()).sum();
    let dot_v2: f64 = v2.iter().zip(vec).map(|(a, b)| a.abs() * b.abs()).sum();
    let score = 1200.0 / (dot_v1 * dot_v2);
    scores.push((others[i].clone(), score, dot_v1, dot_v2));
}
scores.sort_by(|a, b| a.1.partial_cmp(&b.1).unwrap_or(std::cmp::Ordering::Equal));

// Convert top results to JSON string
let top_results: Vec<HashMap<String, String>> = scores.into_iter()
    .take(num_results)
    .map(|(word, score, dot_v1, dot_v2)| {
        let mut map = HashMap::new();
        map.insert("word".to_string(), word);
        map.insert("score".to_string(), score.to_string());
        map.insert("dot_v1".to_string(), dot_v1.to_string());
        map.insert("dot_v2".to_string(), dot_v2.to_string());
        map
    })
    .collect();
serde_json::to_string(&top_results).unwrap()}
