use axum::{ routing::get, Router };
mod map_data;
use http::Method;
use tower_http::cors::{ Any, CorsLayer };
pub fn router() -> Router {
    let cors = CorsLayer::new().allow_methods([Method::GET, Method::POST]).allow_origin(Any);
    let app = Router::new().route("/mapdata", get(map_data::data)).layer(cors);

    app
}
