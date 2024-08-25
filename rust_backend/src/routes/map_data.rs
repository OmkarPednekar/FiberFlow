use axum::response::Json;
use serde::Serialize;
use serde_json::{ json, Value };
use tokio::fs::read_to_string;

pub async fn data() -> Json<Value> {
    let data = read_to_string("dummy_data.json").await.expect("Unable to read file");
    let json_data: Value = serde_json::from_str(&data).expect("Unable to parse JSON");
    Json(json_data)
}
